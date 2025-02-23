"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash } from 'lucide-react';
import React from 'react';
import { DeleteAlert } from './DeleteAlert';

const colors = [
    "bg-red-100", "bg-blue-100", "bg-green-100", "bg-yellow-100",
    "bg-purple-100", "bg-pink-100", "bg-orange-100", "bg-teal-100"
];

interface Meal {
    _id: string;
    name: string;
    description: string;
    mealPlanId: {
        name: string;
        price: number;
    };
    allergens: string[];
}

interface ScheduleCardProps {
    meals: Meal[];
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ meals }) => {
    const onEdit = (id: string) => {
        console.log(`Editing meal with ID: ${id}`);
        // Implement edit functionality
    };


    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meals?.map((meal, index: number) => (
                <Card key={meal._id} className={`relative shadow-lg ${colors[index % colors.length]}`}>
                    <div className="absolute top-3 right-3 flex gap-2">
                        <button
                            onClick={() => onEdit(meal._id)}
                            className="p-2 bg-primary/85 text-white rounded-full hover:bg-primary transition"
                        >
                            <Pencil size={16} />
                        </button>
                        <DeleteAlert id={meal?._id} />
                    </div>
                    <CardHeader>
                        <CardTitle>{meal.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{meal.description}</p>
                        <p>Allergens: {meal.allergens.join(", ")}</p>
                        <p>Plan: {meal.mealPlanId.name}</p>
                        <p className='text-xs'>Price: <span className='font-extrabold'>GHS {meal.mealPlanId.price}</span></p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ScheduleCard;