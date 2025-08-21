import axios from "axios";

export const fetchAddressByZipCode = async (zipCode: string) => {
	const formattedZipCode = zipCode.replace(/\D/g, "");

	if (formattedZipCode.length !== 8) {
		throw new Error("CEP inválido. Certifique-se de que possui 8 dígitos.");
	}

	try {
		const response = await axios.get(`https://viacep.com.br/ws/${formattedZipCode}/json/`);
		if (response.data.erro) {
			throw new Error("CEP não encontrado.");
		}
		return response.data;
	} catch (error) {
		throw new Error("Erro ao consultar o CEP. Tente novamente.");
	}
};
