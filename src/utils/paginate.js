import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;

    //use lodash to chain a conversion, slice array, take items, convert back
    return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}