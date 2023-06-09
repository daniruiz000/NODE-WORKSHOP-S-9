// Importamos los modelos:
import { Cake } from "../domain/entities/cake-entity"
import { User } from "../domain/entities/user-entity";
import { Category } from "../domain/entities/category-entity";
import { AllowedStatus, Order } from "../domain/entities/order-entity";
import { generateRandom } from "./generateRandom";

//  Función de relación entre de documentos de la colección.
export const tartinchisRelations = async (): Promise<void> => {
  try {
    //  Recuperamos cakes, categoriess y users:
    const cakes = await Cake.find();
    if (cakes.length === 0) {
      console.error("No hay libros en la BBDD.");
      return;
    }
    const users = await User.find();
    if (users.length === 0) {
      console.error("No hay autores en la BBDD.");
      return;
    }
    const categories = await Category.find();
    if (categories.length === 0) {
      console.error("No hay editoriales en la BBDD.");
      return;
    }

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      category.cakes = [cakes[generateRandom(0, cakes.length)].id, cakes[generateRandom(0, cakes.length)].id, cakes[generateRandom(0, cakes.length)].id]
      await category.save();
    }

    const order1 = new Order()
    order1.user = users[4].id
    order1.status = AllowedStatus.PENDING
    order1.date = new Date("2023-06-09T10:30:00Z")
    order1.cakes = [cakes[2].id, cakes[6].id]
    order1.address = "calle de los perezosos 2, Madrid"

    const order2 = new Order()
    order2.user = users[2].id
    order2.status = AllowedStatus.PAID
    order2.date = new Date("2021-03-09T10:30:00Z")
    order2.cakes = [cakes[4].id, cakes[1].id]
    order2.address = "calle de los perezosos 2, Madrid"

    await order1.save();
    await order2.save();
    console.log("Relaciones de Tartinchis");
  } catch (error) {
    console.error(error);
  }
};
