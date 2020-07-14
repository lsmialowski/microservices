db.createUser(
  {
    user: "root",
    pwd: "root",
    roles: [
      {
        role: "readWrite",
        db: "feed_service"
      }
    ]
  }
);
