import React, { useState } from "react";
import { ChefHat, Utensils, Plus, Minus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Simulated recipe type
type Recipe = {
	title: string;
	directions: string;
	ingredients: string[];
};
const RecipePredictor = () => {
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [currentIngredient, setCurrentIngredient] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const [recipe, setRecipe] = useState<Recipe | null>(null);

	const { toast } = useToast();

	const handleAddIngredient = () => {
		if (currentIngredient.trim() === "") return;

		if (!ingredients.includes(currentIngredient.trim())) {
			setIngredients([...ingredients, currentIngredient.trim()]);
			setCurrentIngredient("");
		} else {
			toast({
				title: "Ingredient already added",
				description: "This ingredient is already in your list.",
				variant: "destructive",
			});
		}
	};

	const handleRemoveIngredient = (ingredient: string) => {
		setIngredients(ingredients.filter((i) => i !== ingredient));
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddIngredient();
		}
	};

	const generateRecipe = () => {
		if (ingredients.length < 3) {
			toast({
				title: "Not enough ingredients",
				description: "Please add at least 3 ingredients to generate a recipe.",
				variant: "destructive",
			});
			return;
		}

		setIsGenerating(true);
		console.log(ingredients);
		fetch("http://localhost:8000/food", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ingredients: [...ingredients] }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data.data);
				setRecipe(data.data);
			})
			.catch((error) => {
				console.error("Error:", error);
			})
			.finally(() => {
				setIsGenerating(false);
			});
	};

	const resetRecipe = () => {
		setRecipe(null);
	};

	return (
		<div className="max-w-4xl mx-auto space-y-8">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
					<ChefHat className="h-8 w-8 text-[hsl(var(--tool-recipe))]" />
					Recipe Predictor
				</h1>
				<p className="text-muted-foreground">
					Enter ingredients you have, and we'll generate a delicious recipe for
					you.
				</p>
			</div>

			<Card className="border-border/50">
				<CardHeader>
					<CardTitle>What ingredients do you have?</CardTitle>
					<CardDescription>
						Add at least 2 ingredients to generate a recipe
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex gap-2">
							<div className="flex-1">
								<Input
									placeholder="Add an ingredient (e.g., chicken, tomatoes, rice)"
									value={currentIngredient}
									onChange={(e) => setCurrentIngredient(e.target.value)}
									onKeyDown={handleKeyDown}
								/>
							</div>
							<Button
								onClick={handleAddIngredient}
								variant="outline"
								className="flex-shrink-0"
							>
								<Plus className="h-4 w-4 mr-1" /> Add
							</Button>
						</div>

						{ingredients.length > 0 && (
							<div className="space-y-2">
								<Label>Your ingredients:</Label>
								<div className="flex flex-wrap gap-2">
									{ingredients.map((ingredient, index) => (
										<div
											key={index}
											className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm animate-scale-in"
										>
											{ingredient}
											<button
												onClick={() => handleRemoveIngredient(ingredient)}
												className="ml-1 rounded-full hover:bg-secondary-foreground/10 p-1"
											>
												<Minus className="h-3 w-3" />
											</button>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button
						variant="outline"
						onClick={() => setIngredients([])}
						disabled={ingredients.length === 0 || isGenerating}
					>
						Clear All
					</Button>
					<Button
						onClick={generateRecipe}
						disabled={ingredients.length < 2 || isGenerating}
						className="bg-[hsl(var(--tool-recipe))] hover:bg-[hsl(var(--tool-recipe))] hover:opacity-90 text-white"
					>
						{isGenerating ? (
							<>
								Generating<span className="loading">...</span>
							</>
						) : (
							<>
								<Search className="mr-2 h-4 w-4" />
								Generate Recipe
							</>
						)}
					</Button>
				</CardFooter>
			</Card>

			{recipe && (
				<Card className="border-border/50 animate-fade-in">
					<CardHeader className="pb-3">
						<CardTitle className="text-2xl">{recipe.title}</CardTitle>
						<CardDescription>{recipe.directions}</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div>
							<h3 className="font-medium text-lg mb-2 flex items-center gap-2">
								<span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
									<span className="text-xs">1</span>
								</span>
								Ingredients
							</h3>
							<ul className="list-disc pl-5 space-y-1">
								{recipe.ingredients.map((ingredient, index) => (
									<li key={index} className="text-muted-foreground">
										{ingredient}
									</li>
								))}
							</ul>
						</div>
					</CardContent>
					<CardFooter>
						<Button onClick={resetRecipe} variant="outline" className="w-full">
							<Utensils className="mr-2 h-4 w-4" />
							Try Another Recipe
						</Button>
					</CardFooter>
				</Card>
			)}
		</div>
	);
};

export default RecipePredictor;
