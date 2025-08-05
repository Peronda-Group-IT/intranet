'use client'

const StockStatus = ({ stock }) => {
  const getStatusColor = () => {
    if (stock > 500) {
      return 'bg-green-500';
    } else if (stock >= 100 && stock <= 500) {
      return 'bg-yellow-500';
    } else {
      return 'bg-orange-500';
    }
  };

  const formatStock = (stock) => {
    const stockNumber = parseFloat(stock);
    if (isNaN(stockNumber)) {
      return stock;
    }
    return stockNumber.toFixed(2).replace('.', ',');
  }

  return (
    <div className="flex items-center justify-end">
      <span>{formatStock(stock)}</span>
      <div className={`w-3 h-3 rounded-full ml-2 ${getStatusColor()}`} />
    </div>
  );
};

export default StockStatus;
