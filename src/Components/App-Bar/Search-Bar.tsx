import {BsSearch} from 'react-icons/bs';

export type SearchBarPropsType = {
    handleSearchFeild?: (e:React.ChangeEvent<HTMLInputElement>) => void
}

function SearchBar({handleSearchFeild}:SearchBarPropsType) {

    return (
        <div className={ `border rounded-md flex items-center` }>

            <div className={ `border-r p-2` }>
                <BsSearch></BsSearch>
            </div>

            {/* Search Feild */ }
            <div className={ `` }>
                <input onChange={handleSearchFeild} type="text" className={ `w-full p-1 outline-none bg-transparent pl-3` } />
            </div>
        </div>
    );
};
export default SearchBar;