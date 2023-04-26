function SectionHeader({ children }: { children: string }) {

    return (
        <div className={ `my-5` }>
            <h5 className={ `section-header` }>{ children }</h5>
        </div>
    );
};
export default SectionHeader;