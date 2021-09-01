import { MigrationInterface, QueryRunner } from "typeorm";

export class MockPosts1630247331128 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Warner', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 26, 99, 4874, 4, 46.1705063, 1.8852108, '84 Fremont Road', true, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-01-09T10:40:42Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Vernon', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 14, 52, 3194, 2, 11.9104731, -86.0758979, '0274 Autumn Leaf Lane', false, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-01-19T00:34:07Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Hudson', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 6, 356, 914, 1, 22.326471, 112.578178, '412 Hoard Trail', true, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2020-11-20T14:44:15Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Aberg', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 16, 396, 3142, 1, 50.5345697, 14.5397223, '914 Pond Terrace', true, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-01-11T15:40:22Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Hollow Ridge', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 17, 120, 1351, 2, 34.2872962, 133.9508311, '7233 Lerdahl Circle', false, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-03-15T20:31:52Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Esch', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 5, 444, 2694, 1, 9.9886653, 122.8148975, '3555 Heffernan Road', true, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-04-15T15:44:13Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Dovetail', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 21, 122, 4269, 2, 25.456453, 103.240546, '30 Arizona Crossing', false, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-01-07T13:43:10Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Crowley', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 22, 180, 1925, 4, 31.875572, 120.556005, '7 Lunder Street', false, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-03-20T23:32:02Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Oak Valley', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1, 99, 2695, 2, 35.0098555, 135.4825317, '40 Hallows Center', false, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2020-10-01T14:21:15Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Sloan', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 11, 69, 2886, 5, 37.0862154, 127.0391832, '3 Caliangt Alley', false, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-06-25T14:12:28Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Bashford', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.', 1, 196, 1252, 3, 49.6354683, 16.9953098, '693 Melvin Lane', false, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-08-11T11:09:35Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Paget', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 2, 425, 917, 4, -8.6873795, 115.1933778, '25914 Morrow Trail', true, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-01-12T21:00:48Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Birchwood', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 12, 432, 3654, 5, -6.1874721, 106.8274787, '0478 Nova Point', true, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2020-09-06T04:52:57Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('5th', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 17, 220, 4298, 1, -34.6234902, -58.4955016, '393 Ilene Trail', true, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-06-07T11:33:29Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Sunfield', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 11, 211, 4976, 3, 50.7577772, 22.1021741, '78758 Butterfield Place', false, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2021-05-03T01:36:17Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Claremont', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.', 29, 499, 4140, 2, 21.121444, 106.1110501, '7782 Crest Line Alley', false, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2020-11-09T13:03:12Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Loftsgordon', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 14, 165, 3036, 2, 36.067108, 120.382609, '5 Old Gate Point', true, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2020-09-02T06:11:42Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Novick', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 27, 369, 3730, 5, -8.5335451, -172.5165543, '1438 Buhler Road', false, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2020-08-30T23:16:47Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Browning', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 9, 351, 1833, 3, -9.9246703, -48.2592606, '049 Monterey Way', true, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2020-10-24T21:22:22Z');
insert into apartment (name, description, floor, "areaSize", price, "numberOfRooms", latitude, longitude, address, "isRented", "realtorId", "createdAt") values ('Clarendon', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 25, 413, 2992, 2, 48.8693156, 2.3501981, '987 Coleman Pass', false, '0d08035e-da40-4c66-b4aa-874c676d89ed', '2020-10-07T01:24:45Z');

        `);
    }

    public async down(_: QueryRunner): Promise<void> {}
}
