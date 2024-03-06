import { nanoid } from "@reduxjs/toolkit";
import { factory, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";
import { Post, postStatuses } from "../lib/types";
import { HttpResponse, http } from "msw";

const db = factory({
  post: {
    id: primaryKey(String),
    name: String,
    title: String,
    author: String,
    content: String,
    status: String,
    created_at: String,
    updated_at: String,
  },
});

const getRandomStatus = () =>
  postStatuses[Math.floor(Math.random() * postStatuses.length)];

const createPostData = (): Post => {
  const date = faker.date.past().toISOString();
  return {
    id: nanoid(),
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    content: faker.lorem.paragraphs(),
    status: getRandomStatus(),
    created_at: date,
    updated_at: date,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
[...new Array(50)].forEach((_) => db.post.create(createPostData()));

export const handlers = [
  http.get("/posts", ({ request, params }) => {
    console.log(request.url);
    const page = (params.page || 1) as number;
    const per_page = (params.per_page || 10) as number;
    const data = db.post.findMany({
      take: per_page,
      skip: Math.max(per_page * (page - 1), 0),
    });

    return HttpResponse.json({
      data,
      page,
      total_pages: Math.ceil(db.post.count() / per_page),
      total: db.post.count(),
    });
  }),
  ...db.post.toHandlers("rest"),
] as const;
