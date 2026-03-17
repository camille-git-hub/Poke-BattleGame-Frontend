const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Pokemon Battleground</h1>
                <div className="space-x-4">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/login" className="hover:underline">Login</a>
                    <a href="/signup" className="hover:underline">Sign Up</a>
                    <a href="/roster" className="hover:underline">Roster</a>
                    <a href="/battle" className="hover:underline">Battle</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;