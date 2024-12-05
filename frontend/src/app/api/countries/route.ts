interface country {
  country: string;
}

const countries: country[] = [
  { country: "Afghanistan" },
  { country: "Albania" },
  { country: "Algeria" },
  { country: "Andorra" },
  { country: "Angola" },
  { country: "Argentina" },
  { country: "Armenia" },
  { country: "Australia" },
  { country: "Austria" },
  { country: "Azerbaijan" },
  { country: "Bahamas" },
  { country: "Bahrain" },
  { country: "Bangladesh" },
  { country: "Barbados" },
  { country: "Belarus" },
  { country: "Belgium" },
  { country: "Belize" },
  { country: "Benin" },
  { country: "Bhutan" },
  { country: "Bolivia" },
  { country: "Bosnia and Herzegovina" },
  { country: "Botswana" },
  { country: "Brazil" },
  { country: "Brunei" },
  { country: "Bulgaria" },
  { country: "Burkina Faso" },
  { country: "Burundi" },
  { country: "Cambodia" },
  { country: "Cameroon" },
  { country: "Canada" },
  { country: "Cape Verde" },
  { country: "Chad" },
  { country: "Chile" },
  { country: "China" },
  { country: "Colombia" },
  { country: "Comoros" },
  { country: "Costa Rica" },
  { country: "Croatia" },
  { country: "Cuba" },
  { country: "Cyprus" },
  { country: "Czech Republic" },
  { country: "Denmark" },
  { country: "Djibouti" },
  { country: "Dominica" },
  { country: "Dominican Republic" },
  { country: "Ecuador" },
  { country: "Egypt" },
  { country: "El Salvador" },
  { country: "Estonia" },
  { country: "Eswatini" },
  { country: "Ethiopia" },
  { country: "Fiji" },
  { country: "Finland" },
  { country: "France" },
  { country: "Gabon" },
  { country: "Gambia" },
  { country: "Georgia" },
  { country: "Germany" },
  { country: "Ghana" },
  { country: "Greece" },
  { country: "Grenada" },
  { country: "Guatemala" },
  { country: "Guinea" },
  { country: "Guinea-Bissau" },
  { country: "Guyana" },
  { country: "Haiti" },
];

export async function GET() {
  return new Response(JSON.stringify(countries));
}
