/* eslint-disable no-use-before-define */

const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_qSP8EruylciY9jpo-Ky",
    host: "aiven-dashboard-testsociety.b.aivencloud.com",
    port: 20626,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUPkE4zQa4F0HEEg/8E7IoGFUFCmAwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZTI5OGQ4YjEtN2RkNS00Mjk1LTgzNWItOGYzNWU0ZWQ0
YWYyIFByb2plY3QgQ0EwHhcNMjQwOTI5MDgyNDEzWhcNMzQwOTI3MDgyNDEzWjA6
MTgwNgYDVQQDDC9lMjk4ZDhiMS03ZGQ1LTQyOTUtODM1Yi04ZjM1ZTRlZDRhZjIg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAOCZaZwK
SmjWLIG/l8fsZH7HqOWIIv8Y6LKMBMgghBO4UdDs0i8Ixp7tUd37qexH/yNAY+ky
hKt5KhjgkGMHuyqGuXw2LHt6zjH+f8wmPImBO1Azln4B88uHMOMNirMGIaXp29Tj
lkIPduwwayX1uxZQAQ5srWi4Dw7g2VHATo0Ht6a0Y99fq6ZGD+Edku+kw8Md0YWS
gzk5T0OWHWz2FMx3AKBuszJaeMT1+T6SwUR0PAz+ocGiPUGc4IysWMUz1+b2PmUU
qb36luh6SvfyU577mYVffT9JKGK6DyqS/LNvUfTvN6WKR2CirwuRqnUrlUreOkMQ
4ZzsOj/bhsSd/Hf1Fzr1L2aWURlbbrAfMNOMNVOmY1vz0tevXrHCR7DaEPesYZP2
ix1DGkZYfGbM4tM0poyfeHc6KaTCQamd4mlrUWdnb4PHbNcGKFlWbmhfXp2aU5WP
G1YaXYOgUVIcuoriyi4LXTUfgaVpQUEYXxWcsWsWiwmFIzo461Mj+QRFxwIDAQAB
oz8wPTAdBgNVHQ4EFgQU5LMv9APdM0vZxL4tVj3TtMicEuYwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAIs4uuQwmK7nah5X
EdZgSbTPik9cf1+q/ykXuAQdxue93nFMZ0S1aCbRHgFI62NWODfAPmhJ8PBalnRe
6qKhMWZpUzMOowPUlxJdW10p9i+8Djztdp8ni129TxIJLG29pq1FjFKii8ml1Kjp
53oAXasn/qoNIhNuUHs4zcxVhnJIjLp2UwOSEiSCT2lsN1ymaGgt0VQW6Uty74d7
RU/k1SBMcgBEFyesE6tmULOa+zMJp+Gxems0DonSHQugbV2SrBJbUlqerzYiYbzZ
hsHiA9ew3CkBqvKvcwZpHjjHmJ9Pk8It2Ykn0XDb3CF6IXOCcBO1negYWSQlOvuX
7sMa01SFCyeWpB1GiLeDTdDJTE2DEm/u4GDlo7zLL4NhvDtN0EAgWg1IJzjHSfX0
Qlazi7H3sTT5D0fKKQljA4S8XJn7MKErKDbmgPwVHv/kSGn3uXGVkNuBuRay0rNl
Nwnfdhhl16SCY4jZrvHdUcpwXcdgSMEogtW0ijw0CxrS/oQWtw==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});