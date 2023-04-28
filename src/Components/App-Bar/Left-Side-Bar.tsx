
interface Props {
    children: React.ReactElement,
    className?: string,
}

function LeftSideBar({ children, className }: Props) {

    return (
            <aside className={className}>
                { children }
            </aside>
    );
};

export default LeftSideBar;