type SearchBarProps = {
    searchTerm: string,
    onSearchTermChange: (value: string) => void,
    onSearch: () => void,
    loading: boolean
}

export function SearchBar ({searchTerm, onSearchTermChange, loading, onSearch}: SearchBarProps){
    return (
        <div className="hero-content mb-5">
            <label htmlFor="search" className="input">
            <input id="search" type="search" value={searchTerm} onChange={(e) => onSearchTermChange(e.target.value)} placeholder="What pokemon are you looking for?" />
            </label>
            <button className="btn" onClick={onSearch} disabled={loading}>Search</button>
        </div>
    )
}

export default SearchBar;