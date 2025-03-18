import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.style.deleteMany()
  await prisma.size.deleteMany()
  await prisma.product.deleteMany()

  // Create Bomber Jacket
  await prisma.product.create({
    data: {
      name: 'Bomber Jacket',
      price: 198.00,
      image: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/474936/item/usgoods_09_474936_3x4.jpg',
      description: 'A classic bomber jacket with modern tailoring.',
      styles: {
        create: [
          { 
            name: 'Black', 
            image: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/474936/item/usgoods_09_474936_3x4.jpg'
          },
          { 
            name: 'Wine', 
            image: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/474936/item/usgoods_19_474936_3x4.jpg?width=400'
          }
        ]
      },
      sizes: {
        create: ['S', 'M', 'L', 'XL'].map(size => ({ name: size }))
      }
    }
  })

  // Create Denim Jacket
  await prisma.product.create({
    data: {
      name: 'Denim Jacket',
      price: 168.00,
      image: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/476942/item/usgoods_64_476942_3x4.jpg?width=400',
      description: 'Classic denim jacket with a modern fit.',
      styles: {
        create: [
          { 
            name: 'Denim', 
            image: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/476942/item/usgoods_64_476942_3x4.jpg?width=400'
          }
        ]
      },
      sizes: {
        create: ['S', 'M', 'L', 'XL'].map(size => ({ name: size }))
      }
    }
  })

  // Create Puffer Jacket
  await prisma.product.create({
    data: {
      name: 'Puffer Jacket',
      price: 248.00,
      image: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469896/item/usgoods_01_469896_3x4.jpg?width=400',
      description: 'Warm and lightweight puffer jacket.',
      styles: {
        create: [
          { 
            name: 'Off White', 
            image: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469896/item/usgoods_01_469896_3x4.jpg?width=400'
          },
          { 
            name: 'Black', 
            image: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469896/item/usgoods_09_469896_3x4.jpg?width=400'
          },
          { 
            name: 'Blue', 
            image: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/469896/item/usgoods_67_469896_3x4.jpg?width=400'
          }
        ]
      },
      sizes: {
        create: ['S', 'M', 'L', 'XL'].map(size => ({ name: size }))
      }
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 