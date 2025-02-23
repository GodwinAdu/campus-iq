"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { OccupantDialog } from "./OccupantDialog";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-orange-500",
];

const RoomCard = ({ rooms }: { rooms: IRoom[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room, index) => (
        <Card key={room._id} className={`shadow-xl text-white ${colors[index % colors.length]}`}>
          <CardHeader>
            <CardTitle>Room {room.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Capacity: {room.capacity}</p>
            <p>Occupied: {room.studentIds.length}</p>
            <Progress
              value={(room.studentIds.length / (room.capacity ?? 1)) * 100}
              className="mt-2 bg-gray-200"
            />
            <div className="mt-4">
              <OccupantDialog />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RoomCard;
