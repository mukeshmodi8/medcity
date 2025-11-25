export default function requireAdmin(req, res, next) {
  const role = req.user?.role || req.headers["x-role"];

  if (role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
}
