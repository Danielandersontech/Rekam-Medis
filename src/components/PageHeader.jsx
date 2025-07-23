export default function PageHeader({ title = "Dashboard", breadcrumb, children }) {
    const renderBreadcrumb = () => {
        if (typeof breadcrumb === "string") {
            return <span className="text-gray-500">{breadcrumb}</span>;
        }

        if (Array.isArray(breadcrumb)) {
            return (
                <div className="flex items-center space-x-2 mt-2">
                    {breadcrumb.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <span className="text-gray-500">{item}</span>
                            {index !== breadcrumb.length - 1 && <span className="mx-2">/</span>}
                        </div>
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">{title}</h1>
                {renderBreadcrumb()}
            </div>
            <div className="flex gap-2">{children}</div>
        </div>
    );
}