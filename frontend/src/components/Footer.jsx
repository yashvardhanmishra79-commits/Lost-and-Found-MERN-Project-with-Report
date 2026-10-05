const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-blue-600 px-8 md:px-[300px] flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8 text-white">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Featured</h2>
          <p className="text-sm">Most viewed</p>
          <p className="text-sm">Readers' choice</p>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Support</h2>
          <p className="text-sm">Forum</p>
          <p className="text-sm">Resend posts</p>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="text-sm">Privacy Policy</p>
          <p className="text-sm">Terms & Conditions</p>
          <p className="text-sm">Terms of Service</p>
        </div>
      </div>
      <p className="py-2 pb-6 text-center text-white bg-blue-600 text-sm">
        &copy; Find Your Losted Things {new Date().getFullYear()}
      </p>
    </>
  );
};

export default Footer;
