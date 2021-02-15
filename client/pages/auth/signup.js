const SignUp = () => {
  return (
    <form>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input type="text" className="form-control" name="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password Address</label>
        <input type="password" className="form-control" name="password" />
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default SignUp;
