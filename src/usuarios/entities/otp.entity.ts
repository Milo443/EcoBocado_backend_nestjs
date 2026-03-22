import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('otps')
export class OtpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 10, name: 'otp_code' })
  otp_code: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @Column({ default: false, name: 'is_used' })
  is_used: boolean;
}
