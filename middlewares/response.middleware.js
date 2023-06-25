const responseMiddleware = (req, res, next) => {
  if(res.err) {
    res.status(400);
    res.send({error: true, message: res.err.toString()});

    return next();
  }

  if(!res.data || res.data.length === 0) {
    res.status(404);
    res.send({error: true, message: "Data was not found"});

    return next();
  }

  res.status(200);
  res.send(res.data);

  next();
};

export { responseMiddleware };
