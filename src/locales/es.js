const translations = {
  es: {
    app: {
      name: 'Administrador de comercios'
    },
    navigation: {
      products: 'Productos',
      productCategories: 'Categorías de productos',
      stores: 'Comercios',
      paymentMethods: 'Métodos de pago',
      employees: 'Empleados',
      orders: 'Órdenes'
    },
    label: {
      save: 'Guardar',
      cancel: 'Cancelar',
      clear: 'Limpiar',
      confirm: 'Continuar',
      new: 'Nuevo',
      edit: 'Editar',
      delete: 'Eliminar',
      back: 'Regresar'
    },
    alert: {
      empty: 'No hay registros que mostrar.'
    },
    header: {
      new: 'Crear %{entity}',
      edit: 'Editar %{entity}',
      list: 'Lista de %{entity}'
    },
    dialog: {
      delete: {
        title: 'Eliminar %{entity}',
        message: 'Tenga en cuenta que esta acción no se puede deshacer, ¿está seguro que desea eliminar este %{entity}?'
      }
    },
    entities: {
      product: 'producto | productos',
      productCategory: 'categoría | categorías',
      store: 'comercio | comercios',
      paymentMethod: 'método de pago | métodos de pago',
      employee: 'empleado | empleados',
      order: 'órden | órdenes'
    },
    product: {
      name: 'Nombre',
      code: 'Código',
      price: 'Precio',
      specialPrice: 'Precio de promoción',
      productCategory: 'Categoría',
      store: 'Comercio'
    },
    productCategory: {
      name: 'Nombre',
      code: 'Código'
    },
    store: {
      name: 'Nombre'
    },
    paymentMethod: {
      name: 'Nombre',
      code: 'Código'
    },
    employee: {
      name: 'Nombre',
      store: 'Comercio'
    },
    order: {
      date: 'Fecha',
      number: 'Número',
      store: 'Comercio',
      employee: 'Empleado'
    }
  }
}

export default translations;
