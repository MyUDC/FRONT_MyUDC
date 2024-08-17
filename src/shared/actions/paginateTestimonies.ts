"use server";

import prisma from "@/lib/prisma";

export default async function paginateTestimonies(take: number, skip: number) {
  return prisma.testimony.findMany({
    include: {
      user: { select: { name: true, image: true, } },
      career: { select: { name: true } },
      _count: { select: { Comments: true, TestimonyLike: true } },
    },
    skip,
    take
  })
}