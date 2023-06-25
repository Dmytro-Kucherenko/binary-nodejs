const responseMiddleware = (req, res, next) => {
  try {
    next();

    if(res.err)
      throw res.err;

    if(!res.data || res.data.length === 0) {
      res.status(404);
      res.send({error: true, message: "Data was not found"});

      return;
    }

    res.status(200);
    res.send(res.data);
  }
  catch(e) {
    res.status(400);
    res.send({error: true, message: e.toString()});
  }
};

export { responseMiddleware };
