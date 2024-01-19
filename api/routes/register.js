const express = require('express')
const app = express()
const port = 3000
const crypto = require('crypto');

const encryptRsa = (publicKey, plainText) => { 
  try { 
    return crypto.publicEncrypt({ 
      key: publicKey, 
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING 
    }, Buffer.from(plainText)); 
  } catch (e) { 
    console.error('Encryption error:', e.message); 
    return undefined; 
  } 
};

const publicKey = '-----BEGIN RSA PUBLIC KEY-----\nMIICCgKCAgEA8EewHiHjAtW/Qr8kXoSj3sRZrlkyGBNMqjscKpMxs6dgv37u6Hfq\nJDMzoxPLZ6Vd63prNsgRyBR4xBqtjDH8whV2UNoaUUryPDwuONUvoMY39IQ33r5Y\nkXxJ96MDJbhlw27YuGeZ9BdTkbFfSj/D/ONHFiU82RcB1c07Is3QDx3eBiDbmnbD\n7k69vgvKP/vCsW6QZFyNIk4WLgPKn4tsaLxcs7Krbz4Vg74HjezHlGbIqiTfHGHP\nPrMuQvZBnQpS/Y17+M0YVTTYVI+IYCfzotl+60AFuyCMroUpFyT7+BVXSvJPC9/k\nULt1Ur5XX3kkE6XEUJcGk6pGX5LMoAnZZ+QFlvr42Kx5aPkl4f01npSwIJGIcU1k\n/KXutQVRKqvTdeGRoRsZif+wZnpDONGsNxjcdmqVsLZ+M9e/Z/rHfOsGOggoCcm1\nyB35JqUJ9vheNJl5hkTl9waGvvR9HNJzY3ABsC2PnMqpQ9jN6G+hfFzy+pT82/Be\ndoa95UG463oQoEIZZejAHIE8ugDDKj1Lyy2OAL2iU+p6ukRR32xRs9KDZLzfjFDd\nxOCt4I4atjnVIY3eslEV6MtPtJUyiij17vVTET1mtUs+A48ETgnUtNfMyIOXQsRj\n0SNdiEqhYZX6BklLOyzTDrBwcj8dYe03W2dI+uB9v+ZCA+fm3juk9tkCAwEAAQ==\n-----END RSA PUBLIC KEY-----\n';

const plainText = 'toan123';

const encryptedMessage = encryptRsa(publicKey, plainText); 
if (encryptedMessage !== undefined) 
  { 
    console.log('\nEncrypted Message:\n', encryptedMessage.toString('base64'));
  }