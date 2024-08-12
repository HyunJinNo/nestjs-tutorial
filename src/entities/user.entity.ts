// 데코레이터 임포트
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity() // 엔티티 객체임을 알려주기 위한 데코레이터
export class User {
  @PrimaryGeneratedColumn()
  id?: number; // id는 pk이며 자동 증가하는 값

  @Column({ unique: true })
  email: string; // email은 유니크한 값

  @Column({ nullable: true }) // 패스워드에 빈 값 허용
  password: string;

  @Column()
  username: string;

  /*
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDt: Date = new Date(); // 기본값을 넣어줌
  */

  @Column({ nullable: true }) // providerId에 빈 값 허용
  providerId: string; // providerId 추가

  @CreateDateColumn()
  createdDt: Date;

  @UpdateDateColumn()
  updatedDt: Date;

  @DeleteDateColumn()
  deletedDt: Date | null;
}
