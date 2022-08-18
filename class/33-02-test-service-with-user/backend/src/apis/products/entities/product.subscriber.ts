import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';
import { BigQuery } from '@google-cloud/bigquery';

@EventSubscriber()
export class ProductsSubscripber implements EntitySubscriberInterface<Product> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    // console.log(event);

    const bigQuery = new BigQuery({
      projectId: 'norse-avatar-358105',
      keyFilename: 'gcp-bigquery.json',
    });

    bigQuery
      .dataset('mybigquery04')
      .table('productlog')
      .insert([
        {
          //   ...event.entity,
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);

    event.entity.id;
    event.entity.name;
    event.entity.description;
    event.entity.price;
    event.entity.isSoldout;
  }
}
