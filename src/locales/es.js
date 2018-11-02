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
      orders: 'Ordenes',
      reports: 'Reportes',
      logout: 'Cerrar sesión'
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
    toast: {
      failure: {
        create: 'No se pudo guardar el registro',
        update: 'No se pudo actualizar el registro',
        delete: 'No se pudo eliminar el registro'
      },
      success: {
        create: 'Registro guardado',
        update: 'Registro actualizado',
        delete: 'Registro eliminado'
      }
    },
    header: {
      new: 'Crear %{entity}',
      edit: 'Editar %{entity}',
      list: 'Lista de %{entity}'
    },
    dialog: {
      add: {
        title: 'Agregar %{entity}',
        message: 'Ingrese la información solicitada en el siguiente formulario.'
      },
      edit: {
        title: 'Editar %{entity}',
        message: 'Ingrese la información solicitada en el siguiente formulario.'
      },
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
      order: 'orden | ordenes',
      invoice: 'factura | facturas',
      session: 'sesión | sesiones'
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
      title: 'Orden #%{number}',
      date: 'Fecha',
      number: 'Número',
      store: 'Comercio',
      employee: 'Empleado',
      total: 'Total',
      subtotal: 'Subtotal',
      taxesTotal: 'Impuestos',
      discountsTotal: 'Descuentos',
      chargesTotal: 'Cargos adicionales',
      balance: 'Balance',
      steps: {
        one: {
          title: 'Orden',
          summary: ''
        },
        two: {
          title: 'Productos',
          summary: ''
        },
        three: {
          title: 'Facturación',
          summary: ''
        }
      }
    },
    orderLine: {
      product: 'Producto',
      quantity: 'Cantidad',
      price: 'Precio',
      comment: 'Comentario',
      billable: 'Facturable',
      total: 'Total'
    },
    invoice: {
      date: 'Fecha',
      number: 'Número',
      paymentMethod: 'Método de pago',
      amount: 'Monto'
    },
    session: {
      username: 'Usuario',
      password: 'Contraseña'
    }
  }
}

export default translations;
