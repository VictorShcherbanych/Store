class DocumentsController {
    constructor({ DocumentsModel }) {
        this.DocumentsModel = DocumentsModel
    }

    getDocuments = async (req, res) => {
        try {
            const documents = await this.DocumentsModel.getDocuments()
            res.json(documents)
            return documents
        } catch (e) {
            throw new Error(e)
        }
    }

    addWarehouse = async (req, res) => {
        try {
            if (!req.body) { res.status(400).send('Немає даних') }
            const warehouse = await this.DocumentsModel.addWarehouse(req.body)
            res.status(200).send('Склад створено')
            return (warehouse)
        } catch (e) {
            throw new Error(e)
        }
    }

    addDocument = async (req, res) => {
        try {
            if (!req.body) { res.status(400).send('Немає даних') }
            const document = await this.DocumentsModel.addDocument(req.body)
            res.status(200).send('Документ створено')
            return (document)
        } catch (e) {
            throw new Error(e)
        }
    }

    addProductDocument = async (req, res) => {
        try {
            if (!req.body) { res.status(400).send('Немає даних') }
            const productDocument = await this.DocumentsModel.addProductDocument(req.body)
            res.status(200).send('Документ створено')
            return (productDocument)
        } catch (e) {
            throw new Error(e)
        }
    }

}

module.exports = DocumentsController