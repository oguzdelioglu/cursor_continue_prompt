// cursor25xinput.cjs - CURSOR25X Interactive Input Handler
const readline = require('readline');
const fs = require('fs');
const { exec } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('╔═══════════════════════════════════════╗');
console.log('║      CURSOR25X Interactive Menu       ║');
console.log('╠═══════════════════════════════════════╣');
console.log('║  1. Komut çalıştır                    ║');
console.log('║  2. log.txt içeriğini göster          ║');
console.log('╚═══════════════════════════════════════╝');

rl.question('Seçiminiz (1-2): ', (choice) => {
    switch (choice.trim()) {
        case '1':
            rl.question('Çalıştırılacak komutu girin: ', (command) => {
                console.log(`\nKomut çalıştırılıyor: ${command}\n`);
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Hata: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`Stderr: ${stderr}`);
                    }
                    console.log(`Çıktı:\n${stdout}`);
                    rl.close();
                });
            });
            break;

        case '2':
            // log.txt dosyasının içeriğini oku ve göster
            fs.readFile('log.txt', 'utf8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log('log.txt dosyası bulunamadı. Önce dosya oluşturulmalı.');
                    } else {
                        console.error('Dosyayı okurken hata oluştu:', err);
                    }
                } else {
                    console.log('\nlog.txt dosyasının içeriği:\n');
                    console.log('------------------------');
                    console.log(data);
                    console.log('------------------------');
                }
                rl.close();
            });
            break;

        default:
            console.log('Geçersiz seçim! Lütfen 1 veya 2 girin.');
            rl.close();
    }
});
