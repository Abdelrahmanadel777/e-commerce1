
export class ApiFeatures {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery
        this.searchQuery = searchQuery
    }

    pagination() {
        let pageNumber = this.searchQuery.page * 1 || 1
        if (pageNumber < 1) pageNumber = 1
        parseInt(pageNumber)
        let limit = 2
        let skip = (pageNumber - 1) * limit
        this.pageNumber = pageNumber
        this.mongooseQuery.find().limit(limit).skip(skip)
        return this
    }
    filter() {
        let filterObj = structuredClone(this.searchQuery)
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|lt|gte|lte)/g, val => '$' + val)
        filterObj = JSON.parse(filterObj)

        let queryArray = ['page', 'sort', 'fields', 'search']

        queryArray.map(val => delete filterObj[val])

        this.mongooseQuery.find(filterObj)
        return this
    }
    fields() {
        if (this.searchQuery.fields) {
            let field = this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(field)

        }
        return this
    }
    sort() {
        if (this.searchQuery.sort) {
            let sortedBy = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortedBy)

        }
        return this
    }
    search() {
        if (this.searchQuery.search) {
            this.mongooseQuery.find({

                $or: [
                    { name: { $regex: this.searchQuery.search, $options: "i" } },
                    { title: { $regex: this.searchQuery.search, $options: "i" } }

                ]
            })

        }
        return this
    }

}

