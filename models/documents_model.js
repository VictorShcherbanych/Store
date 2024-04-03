class DocumentsModel {
    constructor( {db} ) {
        this.db = db
    }

    getDocuments = async () => {
        try {
            const documents = await this.db('documents')
            .select(
              'documents.uuid as document_uuid',
              'documents.document_type',
              'documents.document_number',
              'documents.issue_date',
              'warehouses.uuid as warehouse_uuid',
              'warehouses.name as warehouse_name',
              'warehouses.address as warehouse_address',
              'warehouses.contact_person as warehouse_contact_person',
              'warehouses.phone_number as warehouse_phone_number',
              'warehouses.email as warehouse_email',
              'warehouses.city as warehouse_city',
              'warehouses.region as warehouse_region',
              'products.uuid as product_uuid',
              'products.name as product_name',
              'products.description as product_description',
              'products.price as product_price',
              'products.picture as product_picture',
              'products.timestamp as product_timestamp',
              'products_documents.quantity as product_quantity',
              'products_documents.description as product_description_in_document',
              'products_documents.received_date as product_received_date'
            )
            .innerJoin('warehouses', 'documents.warehouse_id', 'warehouses.uuid')
            .innerJoin('products', 'documents.product_id', 'products.uuid')
            .innerJoin('products_documents', 'products.uuid', 'products_documents.product_id')
            return documents
        } catch (e) {
            console.error(e)
        }
    }

    addWarehouse = async (data) => {
        try {
            console.log(data)
            await this.db('warehouses')
                .insert({
                    name: data.name,
                    address: data.address,
                    contact_person: data.contactPerson,
                    phone_number: data.phoneNumber,
                    email: data.email,
                    city: data.city,
                    region: data.region,
                });
        } catch (e) {
            console.error(e)
        }
    }

    addDocument = async (data) => {
        try {
            await this.db('documents')
                .insert({
                    document_type: data.documentType,
                    document_number: data.documentNumber,
                    issue_date: data.issueDate,
                    warehouse_id: data.warehouseId,
                    product_id: data.productId,
                    quantity: data.quantity,
                    description: data.description,
                });
        } catch (e) {
            console.error(e)
        }
    }

    addProductDocument = async (data) => {
        try {
            await this.db('products_documents')
                .insert({
                    name: data.name,
                    category: data.category,
                    price: data.price,
                    warehouse_id: data.warehouseId,
                    product_id: data.productId,
                    quantity: data.quantity,
                    description: data.description,
                    received_date: data.receivedDate
                });
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = DocumentsModel