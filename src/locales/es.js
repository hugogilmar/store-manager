const translations = {
  es: {
    app: {
      name: 'Administrador de comercios'
    },
    navigation: {
      title: 'Menú principal',
      groups: {
        cruds: 'Mantenimientos',
        reports: 'Reportes',
        settings: 'Configuración'
      },
      links: {
        products: 'Productos',
        productCategories: 'Categorías de productos',
        stores: 'Comercios',
        paymentMethods: 'Métodos de pago',
        employees: 'Empleados',
        charges: 'Cargos',
        orders: 'Ordenes',
        locations: 'Ubicaciones',
        productsReport: 'Ingresos por producto',
        productCategoriesReport: 'Ingresos por categoría',
        paymentMethodsReport: 'Ingresos por método de pago',
        storesReport: 'Ingresos por comercio',
        chargesReport: 'Ingresos por cargos',
        darkMode: 'Modo nocturno'
      },
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
        delete: 'No se pudo eliminar el registro',
        session: 'No se pudo iniciar sesión'
      },
      success: {
        create: 'Registro guardado',
        update: 'Registro actualizado',
        delete: 'Registro eliminado',
        session: 'Sesión iniciada'
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
      charge: 'cargo | cargos',
      order: 'orden | ordenes',
      location: 'ubicación | ubicaciones',
      invoice: 'factura | facturas',
      report: 'reporte | reportes',
      session: 'sesión | sesiones'
    },
    product: {
      name: 'Nombre',
      code: 'Código',
      price: 'Precio',
      specialPrice: 'Precio de promoción',
      productCategory: 'Categoría',
      store: 'Comercio',
      header: 'Productos'
    },
    productCategory: {
      name: 'Nombre',
      code: 'Código',
      header: 'Categorías'
    },
    store: {
      name: 'Nombre',
      header: 'Comercios'
    },
    paymentMethod: {
      name: 'Nombre',
      code: 'Código',
      header: 'Métodos de pago'
    },
    employee: {
      name: 'Nombre',
      code: 'Código',
      store: 'Comercio',
      header: 'Empleados'
    },
    charge: {
      name: 'Nombre',
      code: 'Código',
      amount: 'Porcentage',
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
      billable: 'Facturable',
      location: 'Ubicación',
      guests: 'Personas',
      discountAmount: 'Porcentaje de descuento',
      comment: 'Comentario',
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
          title: 'Cargos',
          summary: ''
        },
        four: {
          title: 'Facturación',
          summary: ''
        }
      },
      header: 'Ordenes'
    },
    orderLine: {
      product: 'Producto',
      quantity: 'Cantidad',
      price: 'Precio',
      comment: 'Comentario',
      billable: 'Facturable',
      total: 'Total',
      discountAmount: 'Porcentaje de descuento',
      header: 'Productos'
    },
    orderCharge: {
      charge: 'Cargo'
    },
    invoice: {
      date: 'Fecha',
      referenceNumber: 'Número de referencia',
      paymentMethod: 'Método de pago',
      amount: 'Monto',
      header: 'Facturas'
    },
    location: {
      name: 'Nombre',
      code: 'Código',
      store: 'Comercio'
    },
    report: {
      dateFrom: 'Fecha desde',
      dateTo: 'Fecha hasta',
      code: 'Código',
      store: 'Comercio',
      product: 'Producto',
      productCategory: 'Categoría',
      paymentMethod: 'Método de pago',
      charge: 'Cargo',
      quantity: 'Cantidad',
      total: 'Total',
      header: {
        product: 'Ingresos por producto',
        productCategory: 'Ingresos por categoría',
        paymentMethod: 'Ingresos por método de pago',
        store: 'Ingresos por comercio',
        charge: 'Ingresos por cargo'
      }
    },
    session: {
      username: 'Usuario',
      password: 'Contraseña'
    }
  }
}

export default translations;
