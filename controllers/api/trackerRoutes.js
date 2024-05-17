app.post('../../models/tracker', async (req, res) => {
    try {
        const { section, name, nutrition, instructions, thumbnail } = req.body;

        // Save the recipe to the database
        const newRecipe = await Recipe.create({
            section,
            name,
            nutrition,
            instructions,
            thumbnail
        });

        res.status(200).json({ success: true, recipe: newRecipe });
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).json({ success: false, error: 'Failed to save recipe' });
    }
});