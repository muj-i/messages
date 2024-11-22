import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async create(content: string) {
    const messages = await this.findAll();
    const id = Math.floor(Math.random() * 999);

    messages[id] = { id, content };

    await writeFile('messages.json', JSON.stringify(messages));

    return messages[id];
  }

  async findAll() {
    const content = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(content);

    return messages;
  }

  async findOne(id: string) {
    // const content = await readFile('messages.json', 'utf8');
    // const messages = JSON.parse(content);

    const messages = await this.findAll();

    return messages[id];
  }
}
