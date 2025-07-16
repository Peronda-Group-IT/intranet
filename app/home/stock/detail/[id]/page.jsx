export default async function StockDetailPage({ params }) {
    const { id } = await params;
    
    return (
        <h1 className="text-2xl font-bold">
            Stock Detail for ID: {id}
        </h1>
    );
}