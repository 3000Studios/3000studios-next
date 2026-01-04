import fs from 'fs';
import path from 'path';
import { queueMutation } from '../voice/mutation-queue';

async function testMutation() {
    console.log('Starting Voice Mutation Test...');

    const testVar = '--test-voice-integration';
    const testVal = '#ff0000';
    const globalsPath = path.join(process.cwd(), 'app/globals.css');

    try {
        // 1. Snapshot initial state
        if (fs.existsSync(globalsPath)) {
            const initialContent = fs.readFileSync(globalsPath, 'utf-8');
            if (initialContent.includes(testVar)) {
                console.log('Warning: Test variable already exists. Cleaning up first.');
                const cleanContent = initialContent.replace(new RegExp(`\\s*${testVar}:[^;]+;`), '');
                fs.writeFileSync(globalsPath, cleanContent, 'utf-8');
            }
        } else {
            console.error('Globals file not found at:', globalsPath);
            process.exit(1);
        }

        // 2. Queue Mutation
        console.log('Queueing CHANGE_STYLE mutation...');
        const result = await queueMutation({
            type: 'CHANGE_STYLE',
            payload: {
                cssVariable: testVar,
                value: testVal
            }
        });

        console.log('Mutation returned:', JSON.stringify(result, null, 2));

        if (result.status === 'failed') {
            console.error('Mutation failed during processing:', result.result);
            process.exit(1);
        }

        // 3. Verify Persistence (read file)
        await new Promise(r => setTimeout(r, 2000));

        const updatedContent = fs.readFileSync(globalsPath, 'utf-8');

        if (updatedContent.includes(testVar)) {
            console.log('SUCCESS: app/globals.css was updated correctly!');
            console.log('Found:', updatedContent.match(new RegExp(`${testVar}:[^;]+;`))?.[0]);
        } else {
            console.error('FAILURE: app/globals.css was NOT updated.');
            // Debug regex match against file head
            console.log('Head of file (500 chars):', updatedContent.substring(0, 500));
            process.exit(1);
        }

    } catch (err) {
        console.error('Test Failed Exception:', err);
        process.exit(1);
    } finally {
        // 4. Cleanup
        console.log('Cleaning up...');
        if (fs.existsSync(globalsPath)) {
            const finalContent = fs.readFileSync(globalsPath, 'utf-8');
            if (finalContent.includes(testVar)) {
                const cleanContent = finalContent.replace(new RegExp(`\\s*${testVar}:[^;]+;`), '');
                fs.writeFileSync(globalsPath, cleanContent, 'utf-8');
                console.log('Cleanup complete.');
            } else {
                console.log('Nothing to cleanup.');
            }
        }
    }
}

testMutation();
