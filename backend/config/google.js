import { google } from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()

const oauth2client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
)

async function getGoogleUserInfo(code) {
  try {
    const { tokens } = await oauth2client.getToken(code)
    oauth2client.setCredentials(tokens)
    
    const people = google.people({ version: 'v1', auth: oauth2client })
    const response = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos',
    })
    
    const userData = {
      email: response.data.emailAddresses?.[0]?.value || '',
      name: response.data.names?.[0]?.displayName || '',
      profilePicture: response.data.photos?.[0]?.url || '',
      rawData: response.data
    }
    
    return userData
  } catch (error) {
    console.error('Error getting Google user info:', error)
    throw error
  }
}


export { oauth2client, getGoogleUserInfo }