db.createUser(
  {
    user: "root",
    pwd: "root",
    roles: [
      {
        role: "readWrite",
        db: "post_service"
      }
    ]
  }
);
