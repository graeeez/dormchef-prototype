import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RecipeProvider } from '../context/RecipeContext'; 

import StartScreen from '../screens/StartScreen';
import HomeScreen from '../screens/HomeScreen';
import ToolsScreen from '../screens/ToolsScreen';
import RecipesScreen from '../screens/RecipesScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import SavedRecipesScreen from '../screens/SavedRecipeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <RecipeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Tools" component={ToolsScreen} />
          <Stack.Screen name="Recipes" component={RecipesScreen} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
          <Stack.Screen name="SavedRecipes" component={SavedRecipesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecipeProvider>
  );
}