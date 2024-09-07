export const transformSearchResult = (data: Array<any>, uniqueTemp, id?: number | null, _isOpen?: boolean) => {
    const nest = (items, _id = id == undefined ? null : id, link = "parentId") =>
        items
            .filter((item) => {
                item.isOpen = _isOpen;
                if (item[link] === _id) {
                    return item;
                }
            })
            .map((item) => {
                return { ...item, isOpen: _isOpen, children: nest(items, item.id, link) };
            });
    const end = nest(data);
    var acc: any = [];
    end.forEach((e) => {
        uniqueTemp.forEach((temp) => {
            if (temp.id == e.id) {
                e.isOpen = _isOpen;
                acc.push(e);
            }
        });
    });
    return acc;
};

export const transform = (data: Array<any>, id?: string | number | null, _link?: string) => {
    const nest = (items, _id = id == undefined ? null : id, link = _link === undefined ? "parentId" : _link) =>
        items
            .filter((item) => {
                if (item[link] === _id) {
                    return item;
                }
            })
            .map((item) => ({ ...item, isOpen: false, children: nest(items, item.id) }));
    return nest(data);
};

export function flattenTree(tree) {
    const flattened: any = [];
    function flattenNode(node) {
        const { children, ...rest } = node;
        flattened.push(rest);
        if (children && Array.isArray(children)) {
            children.forEach(flattenNode);
        }
    }
    tree.forEach(flattenNode);
    return flattened;
}
