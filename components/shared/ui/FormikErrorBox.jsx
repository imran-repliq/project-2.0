export default function FormikErrorBox(props) {
  const { formik, field } = props;
  const showError = formik.errors[field] && formik.touched[field];
  const classes =
    "rounded-md bg-red-50 px-2 py-1 mt-2 text-[13px] text-red-500 border border-red-200";
  const errorMessage = formik.errors[field];
  return showError ? <div className={classes}>{errorMessage}</div> : null;
}
