import axios from 'axios';
export async function getCertificateData(url: string): Promise<any> {

const options = {
  method: 'GET',
  url: `https://ssl-certificate-checker3.p.rapidapi.com/${url}`,
  headers: {
    'X-RapidAPI-Key': process.env.CERTIFICATE_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.CERTIFICATE_RAPID_API_HOST,
  }
};

try {
	const response = await axios.request(options);
    return response.data;
} catch (error) {
	console.error(error);
}
}


const certificateController = {
    getCertificateData
};

export default certificateController;