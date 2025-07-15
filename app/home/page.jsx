"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

const HomePage = () => {
  const [isCopied, setIsCopied] = useState(false);
  const textToCopyRef = useRef(null);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopyRef.current.textContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const stockCategories = [
    { name: "Peronda", route: "/home/stock/99" },
    { name: "Discontinuados", route: "/home/stock/97" },
    { name: "Comerciales", route: "/home/stock/96" },
    { name: "Harmony", route: "/home/stock/94" },
  ];

  return (
    <div className="container mx-auto p-4 space-y-8">
      <section id="stock-categories">
        <h2 className="text-3xl font-bold text-center mb-8">Stock Categories</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stockCategories.map((category) => (
            <Card
              key={category.name}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(category.route)}
            >
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>View stock for {category.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className={"cursor-pointer"}>Go to Stock</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
