import { MigrationInterface, QueryRunner } from 'typeorm';

//Extraigo los mismos datos de productos utilizados en pruebas para el hito2
const ESPECIES: [number, string][] = [
  [1, "Gato"],
  [2, "Perro"],
  [3, "Periquito"],
  [4, "Ave"],
  [5, "Tortuga"],
  [6, "Reptil"],
  [7, "Cobaya"],
  [8, "Hámster"],
  [9, "Conejo"],
  [10, "Hurón"],
];

// [id, nombre, id de la categoría padre (null = categoría principal)]
const CATEGORIAS: [number, string, number | null][] = [
  [1, "Alimentos y snacks", null],
  [2, "Salud y bienestar", null],
  [3, "Accesorios", null],
  [4, "Alimentos", null],
  [5, "Jaulas y accesorios", null],
  [6, "Terrarios y accesorios", null],
  [7, "Juguetes y enriquecimiento", null],
  [8, "Farmacia", null],
  [9, "Ofertas", null],
  [10, "Alimentos secos", 1],
  [11, "Snacks", 1],
  [12, "Arenas y accesorios", 2],
  [13, "Camas y rascadores", 2],
  [14, "Juguetes", 3],
  [15, "Alimentos húmedos", 1],
  [16, "Camas", 2],
  [17, "Vestuario", 3],
  [18, "Periquitos", 4],
  [19, "Tortugas", 4],
  [20, "Cobayas", 4],
  [21, "Higiene", 2],
  [22, "Platos y bebederos", 2],
  [23, "Externos", 8],
];

const PRODUCTOS = [
  {
    "id": "41240933-fb5e-58a2-974c-fd3eaba18a12",
    "sku": "GAT100001",
    "nombre": "Alimento seco premium para gatos adultos 3 kg",
    "descripcion": "Alimento completo para gatos adultos, con proteínas y nutrientes esenciales.",
    "marca": "MichiPet",
    "categoriaId": 10,
    "especieId": 1,
    "precio": 18990,
    "precioOriginal": 21990,
    "stock": 43,
    "cantidad": 1,
    "descuento": 14,
    "rangoEdad": "Adulta",
    "material": "Alimento balanceado",
    "fichaTecnica": "Formato: 3 kg. Alimento completo para gatos adultos.",
    "modoDeUso": "Servir según el peso y las necesidades del gato. Mantener agua fresca disponible.",
    "fichaTecnicaDetalle": {
      "peso": "3 kg",
      "etapaVida": "Adulto",
      "formato": "Bolsa"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Alimento+Gato"
    ]
  },
  {
    "id": "07b307fa-9eb6-5f84-b03f-35d699bf89b5",
    "sku": "GAT100002",
    "nombre": "Snack cremoso de salmón para gatos 60 g",
    "descripcion": "Snack cremoso para complementar la alimentación de tu gato.",
    "marca": "MiauBites",
    "categoriaId": 11,
    "especieId": 1,
    "precio": 2990,
    "precioOriginal": 3490,
    "stock": 118,
    "cantidad": 1,
    "descuento": 14,
    "rangoEdad": "Todas las edades",
    "material": "Preparado alimenticio",
    "fichaTecnica": "Contenido: 60 g. Sabor salmón.",
    "modoDeUso": "Ofrecer como complemento alimenticio y respetar la ración diaria recomendada.",
    "fichaTecnicaDetalle": {
      "peso": "60 g",
      "sabor": "Salmón",
      "formato": "Sobres"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Snack+Gato"
    ]
  },
  {
    "id": "0d031630-77f2-5d49-9914-9b49e20f20b5",
    "sku": "GAT100003",
    "nombre": "Arena sanitaria aglomerante 10 kg",
    "descripcion": "Arena sanitaria diseñada para facilitar la limpieza y controlar los olores.",
    "marca": "CleanPaws",
    "categoriaId": 12,
    "especieId": 1,
    "precio": 9990,
    "precioOriginal": 11990,
    "stock": 63,
    "cantidad": 1,
    "descuento": 17,
    "rangoEdad": "Todas las edades",
    "material": "Arcilla",
    "fichaTecnica": "Peso neto: 10 kg. Arena aglomerante.",
    "modoDeUso": "Distribuir en una bandeja sanitaria y retirar los residuos diariamente.",
    "fichaTecnicaDetalle": {
      "peso": "10 kg",
      "tipo": "Aglomerante",
      "uso": "Interior"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Arena+Sanitaria"
    ]
  },
  {
    "id": "6f2797bf-bc72-5e59-be44-e570277b2d53",
    "sku": "GAT100004",
    "nombre": "Rascador vertical con plataforma",
    "descripcion": "Rascador compacto con poste y plataforma para descansar y jugar.",
    "marca": "CatHome",
    "categoriaId": 13,
    "especieId": 1,
    "precio": 24990,
    "precioOriginal": 29990,
    "stock": 18,
    "cantidad": 1,
    "descuento": 17,
    "rangoEdad": "Todas las edades",
    "material": "Sisal y madera",
    "fichaTecnica": "Rascador vertical con base estable y plataforma superior.",
    "modoDeUso": "Ubicar sobre una superficie plana en un lugar accesible para el gato.",
    "fichaTecnicaDetalle": {
      "altura": "60 cm",
      "materialPoste": "Sisal",
      "estructura": "Madera"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Rascador+Gato"
    ]
  },
  {
    "id": "60cfb58c-bf1c-5e8f-beba-3757d82e521d",
    "sku": "GAT100005",
    "nombre": "Juguete interactivo con plumas",
    "descripcion": "Juguete con plumas para estimular el juego y los instintos de caza.",
    "marca": "MiauPlay",
    "categoriaId": 14,
    "especieId": 1,
    "precio": 3990,
    "precioOriginal": 3990,
    "stock": 90,
    "cantidad": 1,
    "descuento": 0,
    "rangoEdad": "Todas las edades",
    "material": "Plástico y plumas sintéticas",
    "fichaTecnica": "Juguete manual con varilla y plumas.",
    "modoDeUso": "Utilizar bajo supervisión y revisar periódicamente el estado del juguete.",
    "fichaTecnicaDetalle": {
      "largo": "45 cm",
      "tipo": "Interactivo",
      "uso": "Juego supervisado"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Juguete+Gato"
    ]
  },
  {
    "id": "b5b13f33-d51e-5b8e-8b25-0d94f3d31d94",
    "sku": "PER200001",
    "nombre": "Alimento seco para perros adultos 10 kg",
    "descripcion": "Alimento balanceado para perros adultos de tamaño mediano.",
    "marca": "DogBalance",
    "categoriaId": 10,
    "especieId": 2,
    "precio": 27990,
    "precioOriginal": 32990,
    "stock": 38,
    "cantidad": 1,
    "descuento": 15,
    "rangoEdad": "Adulta",
    "material": "Alimento balanceado",
    "fichaTecnica": "Formato: 10 kg. Alimento para perros adultos.",
    "modoDeUso": "Servir de acuerdo con el peso y nivel de actividad del perro.",
    "fichaTecnicaDetalle": {
      "peso": "10 kg",
      "etapaVida": "Adulto",
      "formato": "Bolsa"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Alimento+Perro"
    ]
  },
  {
    "id": "7d9d7f41-2145-55fe-8839-2508318e9046",
    "sku": "PER200002",
    "nombre": "Alimento húmedo de pollo para perros 400 g",
    "descripcion": "Alimento húmedo para perros, ideal para servir como comida o complemento.",
    "marca": "DogBalance",
    "categoriaId": 15,
    "especieId": 2,
    "precio": 2490,
    "precioOriginal": 2990,
    "stock": 100,
    "cantidad": 1,
    "descuento": 17,
    "rangoEdad": "Adulta",
    "material": "Alimento húmedo",
    "fichaTecnica": "Contenido neto: 400 g. Sabor pollo.",
    "modoDeUso": "Servir a temperatura ambiente y refrigerar el contenido sobrante.",
    "fichaTecnicaDetalle": {
      "peso": "400 g",
      "sabor": "Pollo",
      "formato": "Lata"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Comida+Humeda+Perro"
    ]
  },
  {
    "id": "dd1783ec-bf1b-5946-aed6-b9adf6b261d7",
    "sku": "PER200003",
    "nombre": "Cama acolchada para perros talla M",
    "descripcion": "Cama acolchada para ofrecer un espacio cómodo de descanso.",
    "marca": "PetComfort",
    "categoriaId": 16,
    "especieId": 2,
    "precio": 19990,
    "precioOriginal": 24990,
    "stock": 24,
    "cantidad": 1,
    "descuento": 20,
    "rangoEdad": "Todas las edades",
    "material": "Poliéster y espuma",
    "fichaTecnica": "Cama acolchada de uso interior.",
    "modoDeUso": "Ubicar en un espacio seco y lavar según las instrucciones del fabricante.",
    "fichaTecnicaDetalle": {
      "talla": "M",
      "medidas": "60 x 45 cm",
      "material": "Poliéster"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Cama+Perro"
    ]
  },
  {
    "id": "99b6b095-da64-5dd1-8d6f-efa2d8c298a3",
    "sku": "PER200004",
    "nombre": "Arnés ajustable para perros",
    "descripcion": "Arnés regulable para paseos cotidianos con un ajuste cómodo.",
    "marca": "PaseoPet",
    "categoriaId": 17,
    "especieId": 2,
    "precio": 8990,
    "precioOriginal": 10990,
    "stock": 52,
    "cantidad": 1,
    "descuento": 18,
    "rangoEdad": "Todas las edades",
    "material": "Nailon",
    "fichaTecnica": "Arnés ajustable con cierres de seguridad.",
    "modoDeUso": "Ajustar sin apretar y comprobar el calce antes de cada paseo.",
    "fichaTecnicaDetalle": {
      "talla": "M",
      "material": "Nailon",
      "uso": "Paseo"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Arnes+Perro"
    ]
  },
  {
    "id": "abcf0606-abfa-54ba-9368-36d5016b6269",
    "sku": "PER200005",
    "nombre": "Pelota resistente para perros",
    "descripcion": "Pelota para juegos de búsqueda y actividad física.",
    "marca": "PaseoPet",
    "categoriaId": 14,
    "especieId": 2,
    "precio": 4990,
    "precioOriginal": 5990,
    "stock": 75,
    "cantidad": 1,
    "descuento": 17,
    "rangoEdad": "Todas las edades",
    "material": "Caucho",
    "fichaTecnica": "Pelota de caucho para juegos caninos.",
    "modoDeUso": "Elegir un tamaño apropiado para el perro y supervisar el juego.",
    "fichaTecnicaDetalle": {
      "diametro": "7 cm",
      "material": "Caucho",
      "tipo": "Pelota"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Pelota+Perro"
    ]
  },
  {
    "id": "f5b2e767-44c6-58b2-8cf1-71963661c70d",
    "sku": "EXO300001",
    "nombre": "Mezcla de semillas para periquitos 1 kg",
    "descripcion": "Mezcla de semillas para complementar la alimentación de periquitos.",
    "marca": "AlaVerde",
    "categoriaId": 18,
    "especieId": 3,
    "precio": 4990,
    "precioOriginal": 5990,
    "stock": 40,
    "cantidad": 1,
    "descuento": 17,
    "rangoEdad": "Todas las edades",
    "material": "Mezcla de semillas",
    "fichaTecnica": "Contenido: 1 kg. Mezcla de semillas para periquitos.",
    "modoDeUso": "Ofrecer según las necesidades de la especie y complementar con una dieta equilibrada.",
    "fichaTecnicaDetalle": {
      "peso": "1 kg",
      "especieObjetivo": "Periquito",
      "formato": "Bolsa"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Semillas+Periquitos"
    ]
  },
  {
    "id": "9e5db17c-0fe2-5cbb-b004-736e7665680c",
    "sku": "EXO300002",
    "nombre": "Columpio de madera para aves pequeñas",
    "descripcion": "Accesorio para fomentar el movimiento y el enriquecimiento ambiental de aves.",
    "marca": "AlaVerde",
    "categoriaId": 5,
    "especieId": 4,
    "precio": 3990,
    "precioOriginal": 3990,
    "stock": 30,
    "cantidad": 1,
    "descuento": 0,
    "rangoEdad": "Todas las edades",
    "material": "Madera y cuerda",
    "fichaTecnica": "Columpio para aves pequeñas con sistema de suspensión.",
    "modoDeUso": "Fijar firmemente en la jaula y revisar el desgaste de las piezas.",
    "fichaTecnicaDetalle": {
      "material": "Madera",
      "uso": "Enriquecimiento ambiental",
      "instalacion": "Suspendida"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Columpio+Aves"
    ]
  },
  {
    "id": "35e34522-f869-5d9b-9a1c-6a9ba4cb6795",
    "sku": "EXO400001",
    "nombre": "Pellets alimenticios para tortugas acuáticas 250 g",
    "descripcion": "Alimento en pellets para complementar la dieta de tortugas acuáticas.",
    "marca": "ReptiVida",
    "categoriaId": 19,
    "especieId": 5,
    "precio": 5990,
    "precioOriginal": 6990,
    "stock": 35,
    "cantidad": 1,
    "descuento": 14,
    "rangoEdad": "Adulta",
    "material": "Alimento formulado",
    "fichaTecnica": "Contenido: 250 g. Pellets para tortugas acuáticas.",
    "modoDeUso": "Dosificar según la especie, tamaño y recomendaciones del fabricante.",
    "fichaTecnicaDetalle": {
      "peso": "250 g",
      "formato": "Pellets",
      "especieObjetivo": "Tortuga acuática"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Alimento+Tortugas"
    ]
  },
  {
    "id": "b04e0ee0-b87d-59cc-b203-90e4cd838acc",
    "sku": "EXO400002",
    "nombre": "Termómetro digital para terrarios",
    "descripcion": "Instrumento digital para controlar la temperatura ambiental del terrario.",
    "marca": "ReptiVida",
    "categoriaId": 6,
    "especieId": 6,
    "precio": 7990,
    "precioOriginal": 9990,
    "stock": 22,
    "cantidad": 1,
    "descuento": 20,
    "rangoEdad": "Todas las edades",
    "material": "Plástico y componentes electrónicos",
    "fichaTecnica": "Termómetro digital para monitoreo de temperatura.",
    "modoDeUso": "Instalar en un lugar adecuado y verificar las lecturas periódicamente.",
    "fichaTecnicaDetalle": {
      "tipo": "Digital",
      "uso": "Control de temperatura",
      "instalacion": "Interior del terrario"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Termometro+Terrario"
    ]
  },
  {
    "id": "5c02b4f0-344f-552b-aa45-362fbf219e7d",
    "sku": "EXO500001",
    "nombre": "Mezcla de heno y hierbas para cobayas 500 g",
    "descripcion": "Mezcla de heno y hierbas para complementar la alimentación de cobayas.",
    "marca": "PequeMundo",
    "categoriaId": 20,
    "especieId": 7,
    "precio": 4490,
    "precioOriginal": 4990,
    "stock": 48,
    "cantidad": 1,
    "descuento": 10,
    "rangoEdad": "Todas las edades",
    "material": "Heno y hierbas secas",
    "fichaTecnica": "Contenido: 500 g. Mezcla vegetal para cobayas.",
    "modoDeUso": "Proporcionar heno apropiado de forma habitual y complementar con una dieta adecuada.",
    "fichaTecnicaDetalle": {
      "peso": "500 g",
      "tipo": "Heno y hierbas",
      "formato": "Bolsa"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Heno+Cobayas"
    ]
  },
  {
    "id": "5f3ee561-94e9-55f2-b821-e4a01c1db0dc",
    "sku": "EXO500002",
    "nombre": "Túnel de juego para hámsteres",
    "descripcion": "Túnel para explorar, esconderse y enriquecer el entorno de pequeños roedores.",
    "marca": "PequeMundo",
    "categoriaId": 7,
    "especieId": 8,
    "precio": 5990,
    "precioOriginal": 6990,
    "stock": 27,
    "cantidad": 1,
    "descuento": 14,
    "rangoEdad": "Todas las edades",
    "material": "Madera sin tratar",
    "fichaTecnica": "Túnel de exploración para pequeños roedores.",
    "modoDeUso": "Colocar dentro del hábitat y comprobar que las dimensiones sean apropiadas.",
    "fichaTecnicaDetalle": {
      "material": "Madera",
      "uso": "Enriquecimiento ambiental",
      "especieObjetivo": "Hámster"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Tunel+Hamster"
    ]
  },
  {
    "id": "2256bc49-048b-5dbd-a6f6-0fc0c06f8707",
    "sku": "EXO600001",
    "nombre": "Heno natural para conejos 1 kg",
    "descripcion": "Heno para complementar la dieta diaria y favorecer el desgaste dental natural de los conejos.",
    "marca": "Conejito Feliz",
    "categoriaId": 4,
    "especieId": 9,
    "precio": 6990,
    "precioOriginal": 7990,
    "stock": 55,
    "cantidad": 1,
    "descuento": 13,
    "rangoEdad": "Todas las edades",
    "material": "Heno vegetal",
    "fichaTecnica": "Contenido: 1 kg. Heno seco para conejos.",
    "modoDeUso": "Mantener heno adecuado disponible y conservar en un lugar seco.",
    "fichaTecnicaDetalle": {
      "peso": "1 kg",
      "tipo": "Heno",
      "formato": "Bolsa"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Heno+Conejos"
    ]
  },
  {
    "id": "c3268781-d86d-5275-9a05-071c8fac3b44",
    "sku": "EXO700001",
    "nombre": "Túnel flexible para hurones",
    "descripcion": "Túnel flexible para explorar, jugar y estimular la actividad de los hurones.",
    "marca": "MustelaPlay",
    "categoriaId": 7,
    "especieId": 10,
    "precio": 8990,
    "precioOriginal": 10990,
    "stock": 16,
    "cantidad": 1,
    "descuento": 18,
    "rangoEdad": "Todas las edades",
    "material": "Tela sintética",
    "fichaTecnica": "Túnel flexible para actividades supervisadas.",
    "modoDeUso": "Colocar en una zona segura y revisar regularmente que no presente daños.",
    "fichaTecnicaDetalle": {
      "largo": "100 cm",
      "material": "Tela sintética",
      "uso": "Juego supervisado"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Tunel+Hurones"
    ]
  },
  {
    "id": "3ed8d0c7-569f-5471-a713-743aaa0a8ec0",
    "sku": "GAT100006",
    "nombre": "Pack de higiene para gatos",
    "descripcion": "Pack de accesorios básicos para la rutina de higiene de gatos.",
    "marca": "CleanPaws",
    "categoriaId": 21,
    "especieId": 1,
    "precio": 7990,
    "precioOriginal": 9990,
    "stock": 33,
    "cantidad": 1,
    "descuento": 20,
    "rangoEdad": "Todas las edades",
    "material": "Materiales diversos",
    "fichaTecnica": "Pack de accesorios de higiene para uso doméstico.",
    "modoDeUso": "Utilizar cada accesorio según su función y las instrucciones del fabricante.",
    "fichaTecnicaDetalle": {
      "tipo": "Pack de higiene",
      "uso": "Cuidado doméstico",
      "contenido": "Accesorios de higiene"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Higiene+Gatos"
    ]
  },
  {
    "id": "05bea336-f608-582f-89b6-ac152ff3d335",
    "sku": "PER200006",
    "nombre": "Snack dental para perros 180 g",
    "descripcion": "Snack masticable para complementar la rutina de cuidado oral de los perros.",
    "marca": "DogBalance",
    "categoriaId": 11,
    "especieId": 2,
    "precio": 3990,
    "precioOriginal": 4990,
    "stock": 68,
    "cantidad": 1,
    "descuento": 20,
    "rangoEdad": "Adulta",
    "material": "Snack formulado",
    "fichaTecnica": "Contenido: 180 g. Snack masticable para perros.",
    "modoDeUso": "Ofrecer como complemento y supervisar al perro durante la masticación.",
    "fichaTecnicaDetalle": {
      "peso": "180 g",
      "tipo": "Snack masticable",
      "etapaVida": "Adulto"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Snack+Dental"
    ]
  },
  {
    "id": "25c78390-347e-511b-b2b0-55b591fa3b67",
    "sku": "GAT100007",
    "nombre": "Comedero doble antideslizante",
    "descripcion": "Comedero doble para servir alimento y agua en un mismo soporte.",
    "marca": "CatHome",
    "categoriaId": 22,
    "especieId": 1,
    "precio": 6990,
    "precioOriginal": 8490,
    "stock": 42,
    "cantidad": 1,
    "descuento": 18,
    "rangoEdad": "Todas las edades",
    "material": "Acero inoxidable y plástico",
    "fichaTecnica": "Comedero doble con base antideslizante.",
    "modoDeUso": "Lavar antes del primer uso y limpiar los recipientes diariamente.",
    "fichaTecnicaDetalle": {
      "capacidadPorRecipiente": "300 ml",
      "cantidadRecipientes": 2,
      "base": "Antideslizante"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Comedero+Doble"
    ]
  },
  {
    "id": "a8a73b70-cdcf-53f5-8462-2e5dc816a17f",
    "sku": "PER200007",
    "nombre": "Collar antiparasitario para perros",
    "descripcion": "Producto antiparasitario de uso externo para perros, sujeto a las indicaciones de su etiqueta.",
    "marca": "VetCare",
    "categoriaId": 23,
    "especieId": 2,
    "precio": 11990,
    "precioOriginal": 13990,
    "stock": 20,
    "cantidad": 1,
    "descuento": 14,
    "rangoEdad": "Según etiqueta",
    "material": "Material polimérico",
    "fichaTecnica": "Collar antiparasitario. Especie, edad mínima y duración según etiqueta.",
    "modoDeUso": "Utilizar exclusivamente conforme a la etiqueta y las indicaciones veterinarias.",
    "fichaTecnicaDetalle": {
      "tipo": "Antiparasitario externo",
      "especieObjetivo": "Perro",
      "duracion": "Según fabricante"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Collar+Antiparasitario"
    ]
  },
  {
    "id": "348b6ea5-f3a8-50cf-953a-33cf8d3a27f2",
    "sku": "GAT100008",
    "nombre": "Pack de alimento húmedo para gatos 12 unidades",
    "descripcion": "Pack de sobres de alimento húmedo para complementar la alimentación de gatos.",
    "marca": "MichiPet",
    "categoriaId": 9,
    "especieId": 1,
    "precio": 9990,
    "precioOriginal": 12990,
    "stock": 29,
    "cantidad": 1,
    "descuento": 23,
    "rangoEdad": "Adulta",
    "material": "Alimento húmedo",
    "fichaTecnica": "Pack de 12 sobres. Peso por unidad indicado en el envase.",
    "modoDeUso": "Servir según las recomendaciones de alimentación y conservar los sobres sin abrir en un lugar adecuado.",
    "fichaTecnicaDetalle": {
      "unidades": 12,
      "formato": "Sobres",
      "tipo": "Alimento húmedo"
    },
    "imagenes": [
      "https://placehold.co/600x600?text=Pack+Alimento+Gato"
    ]
  }
];

export class DatosPruebaCatalogo1795030000000 implements MigrationInterface {
  name = 'DatosPruebaCatalogo1795030000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const [id, nombre] of ESPECIES) {
      await queryRunner.query('INSERT INTO `especies` (`id`, `nombre`) VALUES (?, ?)', [id, nombre]);
    }

    // Primero las principales y después las subcategorías dado que la foregin key exige que exista el padre primero
    const ordenadas = [...CATEGORIAS].sort((a, b) => (a[2] === null ? 0 : 1) - (b[2] === null ? 0 : 1));
    for (const [id, nombre, padreId] of ordenadas) {
      await queryRunner.query(
        'INSERT INTO `categorias` (`id`, `nombre`, `categoria_padre_id`) VALUES (?, ?, ?)',
        [id, nombre, padreId],
      );
    }

    for (const p of PRODUCTOS) {
      await queryRunner.query(
        `INSERT INTO \`productos\` (\`id\`, \`sku\`, \`nombre\`, \`descripcion\`, \`marca\`, \`categoria_id\`, \`especie_id\`,
          \`precio\`, \`precio_original\`, \`stock\`, \`cantidad\`, \`descuento\`, \`rango_edad\`, \`material\`,
          \`ficha_tecnica\`, \`modo_de_uso\`, \`ficha_tecnica_detalle\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.id, p.sku, p.nombre, p.descripcion, p.marca, p.categoriaId, p.especieId,
          p.precio, p.precioOriginal, p.stock, p.cantidad, p.descuento, p.rangoEdad, p.material,
          p.fichaTecnica, p.modoDeUso, p.fichaTecnicaDetalle ? JSON.stringify(p.fichaTecnicaDetalle) : null,
        ],
      );
      for (const [orden, url] of p.imagenes.entries()) {
        await queryRunner.query(
          'INSERT INTO `producto_imagenes` (`url`, `orden`, `producto_id`) VALUES (?, ?, ?)',
          [url, orden, p.id],
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const ids = PRODUCTOS.map((p) => p.id);
    await queryRunner.query('DELETE FROM `producto_imagenes` WHERE `producto_id` IN (?)', [ids]);
    await queryRunner.query('DELETE FROM `productos` WHERE `id` IN (?)', [ids]);
    // Primero las subcategorías y después las principales
    await queryRunner.query('DELETE FROM `categorias` WHERE `categoria_padre_id` IS NOT NULL');
    await queryRunner.query('DELETE FROM `categorias` WHERE `id` IN (?)', [CATEGORIAS.map(([id]) => id)]);
    await queryRunner.query('DELETE FROM `especies` WHERE `id` IN (?)', [ESPECIES.map(([id]) => id)]);
  }
}