import { redirect } from 'next/navigation';
import { getAllFoods } from '@/lib/search';

export default function RandomBattlePage() {
    const foods = getAllFoods();
    if (foods.length < 2) return <div>Not enough data</div>;

    const idxA = Math.floor(Math.random() * foods.length);
    let idxB = Math.floor(Math.random() * foods.length);
    while (idxA === idxB) {
        idxB = Math.floor(Math.random() * foods.length);
    }

    const idA = foods[idxA].id;
    const idB = foods[idxB].id;

    redirect(`/battle/${idA}/${idB}`);
}
