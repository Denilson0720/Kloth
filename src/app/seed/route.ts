import { neon } from '@neondatabase/serverless';
// import {products,favorites} from '@/app/lib/placeholder-data';
// const sql = neon(`${process.env.DATABASE_URL}`);

async function seedProducts(sql:any){
    try{
      await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      await sql` CREATE TABLE IF NOT EXISTS products (
          productId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          description VARCHAR(255) NOT NULL,
          imageUrls TEXT[] DEFAULT ARRAY[]::TEXT[],
          stockQuantity INT NOT NULL,
          dateCreated TIMESTAMP DEFAULT NOW()
      );`
      await sql`
        INSERT INTO products(name,price,description,imageUrls,stockQuantity)
        VALUES
          (
            ${'Womens Orange Bomber Jacket'},
            ${29.99}::DECIMAL(10,2),
            ${"Make a statement with this women’s orange bomber jacket, designed for those who love to stand out. With its vibrant hue and classic bomber silhouette, this jacket adds a trendy yet sporty touch to any outfit. Made from lightweight yet durable materials, it offers both style and comfort for everyday wear."},
            ARRAY['https://res.cloudinary.com/duhazr5mo/image/upload/v1738704045/Kloth/womens-brown-bomber_ukncno.jpg']::TEXT[],
            ${7}
          ),
          (
            ${'Womens Black Leather Jacket'},
            ${49.99}::DECIMAL(10,2),
            ${"Upgrade your wardrobe with this women’s black leather jacket, a perfect blend of sophistication and bold style. Crafted from premium faux or genuine leather, this jacket features a sleek, tailored fit that enhances your silhouette while ensuring all-day comfort."},
            ARRAY['https://res.cloudinary.com/duhazr5mo/image/upload/v1738704045/Kloth/womens-black-leather-jacket_fm46uz.jpg']::TEXT[],
            ${4}
          ),
          (
            ${'Womens Dark Brown Cotton Sweatshirt'},
            ${24.99}::DECIMAL(10,2),
            ${"Stay effortlessly stylish and comfortable with this women’s dark brown sweatshirt, a must-have for your everyday wardrobe. Designed with soft, breathable fabric, this sweatshirt offers a relaxed yet flattering fit, perfect for lounging or layering up in cooler weather. The rich brown hue adds a touch of warmth and versatility, making it easy to style for any occasion."},
            ARRAY['https://res.cloudinary.com/duhazr5mo/image/upload/v1738704045/Kloth/womens-brown-cardigan-2_mvhp3n.jpg']::TEXT[],
            ${6}
          ),
          (
            ${'Mens Brown-Cream Long Sleeve Cotton Dress Shirt'},
            ${39.99}::DECIMAL(10,2),
            ${"Elevate your formal and casual wardrobe with this stylish men's long-sleeve dress shirt in a sophisticated brown and cream color combination. Crafted from premium, breathable fabric, it offers a tailored fit that ensures both comfort and elegance. Perfect for office wear, special occasions, or a polished everyday look, this shirt pairs effortlessly with dress pants or jeans for a refined finish."},
            ARRAY['https://res.cloudinary.com/duhazr5mo/image/upload/v1738701392/Kloth/white-brown-shirts_a9czlk.jpg']::TEXT[],
            ${12}
          );

      `;
    }catch(e){
        console.log('Error seeding products table: ',e)
    }
}

async function seedFavorites(sql:any){
  try{
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // await sql` 
    //   CREATE TABLE IF NOT EXISTS popular (
    //     popularId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    //     productId UUID,                                         
    //     price DECIMAL(10,2) NOT NULL,
    //     description TEXT NOT NULL,
    //     imageUrls TEXT[] DEFAULT ARRAY[]::TEXT[],
    //     averageRating INT NOT NULL,
    //     dateAdded TIMESTAMP DEFAULT NOW(),                    
    //     name TEXT NOT NULL
    //     CONSTRAINT fk_product FOREIGN KEY (productId) REFERENCES products(productId)
    //   ); 
    // `
    // insertion
    await sql`
      INSERT INTO popular (productId, price, description, imageUrls, averageRating, name) 
      VALUES
        (
          ${'c6e950d1-a63c-4a78-84da-f57c424ed10c'},  -- Foreign key will be set later when productId is available
          ${39.99}::DECIMAL(10,2), 
          ${"Upgrade your denim collection with these women''s blue jeans, designed for the perfect balance of comfort, style, and versatility. Made from high-quality denim, these jeans offer a flattering fit that hugs in all the right places while allowing effortless movement. Whether you prefer a skinny, straight-leg, or relaxed fit, these jeans are a wardrobe staple for every season."},
          ARRAY['https://res.cloudinary.com/duhazr5mo/image/upload/v1738701392/Kloth/blue-jeans-front_mgctyr.jpg', 'https://res.cloudinary.com/duhazr5mo/image/upload/v1738701392/Kloth/blue-jeans-back_xywqxd.jpg']::TEXT[], 
          ${5},  -- Example average rating
          ${'Womens Blue Jeans'}
        ),
        (
          ${'67237aeb-52f8-4a19-a6a7-9bda9ed4fe52'},  -- Foreign key will be set later when productId is available
          ${24.99}::DECIMAL(10,2),
          ${"Stay effortlessly stylish and comfortable with this women''s dark brown sweatshirt, a must-have for your everyday wardrobe. Designed with soft, breathable fabric, this sweatshirt offers a relaxed yet flattering fit, perfect for lounging or layering up in cooler weather. The rich brown hue adds a touch of warmth and versatility, making it easy to style for any occasion."},
          ARRAY['https://res.cloudinary.com/duhazr5mo/image/upload/v1738704045/Kloth/womens-brown-cardigan-2_mvhp3n.jpg']::TEXT[],
          ${4},  -- Example average rating
          ${'Womens Dark Brown Cotton Sweatshirt'}
        ),
        (
          ${'421f35b1-9a8c-47a5-85e8-b1412a148a88'},  -- Foreign key will be set later when productId is available
          ${19.99},
          ${"Elevate your wardrobe with this women''s cream sleeveless cardigan, a perfect layering piece for any season. Designed with a soft, lightweight knit, this cardigan drapes beautifully for a chic and effortless look. Its neutral cream tone makes it easy to style, whether you''re dressing up or keeping it casual."},
          ARRAY['https://res.cloudinary.com/duhazr5mo/image/upload/v1738704046/Kloth/womens-cream-cardigan-top_hwcbhb.jpg']::TEXT[],
          ${4},  -- Example average rating
          ${'Womens Cream Sleeveless Sweater'}
        ),
        (
          ${'473f5ae7-c66f-4a37-b91e-be15aaf727ea'},  -- Foreign key will be set later when productId is available
          ${39.99}::DECIMAL(10,2),
          ${"Embrace beauty and sophistication with this women''s flower-themed jacket, designed to add a touch of grace and vibrancy to your wardrobe. Featuring delicate floral patterns on a stylish silhouette, this jacket is perfect for those who love a mix of feminine charm and modern fashion."},
          ARRAY['https://res.cloudinary.com/duhazr5mo/image/upload/v1738704046/Kloth/womens-flower-jacket_wgeogy.jpg']::TEXT[],
          ${5},  -- Example average rating
          ${'Womens Flower-Themed Jacket'}
        );


    `
  }catch(e){
    console.log('Error seeding favorites table',e)
    return e
  }
}
export async function GET() {
    try {
      // await seedProducts(sql);
      // await seedFavorites(sql);
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      console.log('Seeding error:', error);
      return Response.json({ error }, { status: 500 });
    }
}



