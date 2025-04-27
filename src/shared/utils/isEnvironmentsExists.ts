export default function isEnvironmentsExists() {
  try {
    import('../../../environments/firebaseConfig.ts');
    import('../../../environments/cloudinaryPath.ts');
  } catch (error) {
    throw new Error("firebaseConfig or cloudinaryPath not exists." + error);
  }
}