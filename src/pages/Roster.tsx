export const Battle = () => {
    return (
        <div className="text-center mt-10">
            <h1 className="text-4xl font-bold mb-6">Battle Arena</h1>
            <p className="text-lg mb-4">Choose your Pokemon and battle against other trainers!</p>
            <div className="flex justify-center space-x-8">
                <button className="bg-warning text-white px-6 py-3 rounded hover:bg-warning-dark transition">Start Battle</button>
                <button className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition">View Leaderboard</button>
            </div>
        </div>
    )
}

export default Battle;