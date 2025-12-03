import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Smartphone, Building2, Globe, Heart } from 'lucide-react';

interface DonationModalProps {
  children: React.ReactNode;
}

export default function DonationModal({ children }: DonationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');

  const paymentMethods = [
    {
      id: 'cha9a9a',
      name: 'Cha9a9a.tn',
      icon: Globe,
      description: 'Online payment platform',
      details: 'Secure online payment through Cha9a9a.tn'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct bank transfer',
      details: 'IBAN: TN59 1234 5678 9012 3456 7890 1234\nBank: Banque de Tunisie\nAccount: BornAgain NGO'
    },
    {
      id: 'mobile',
      name: 'Mobile Payment',
      icon: Smartphone,
      description: 'Mobile money transfer',
      details: 'Orange Money: +216 71 123 456\nFlouci: +216 71 123 456'
    },
    {
      id: 'd17',
      name: 'D17 Payment',
      icon: CreditCard,
      description: 'D17 digital wallet',
      details: 'Send to: bornagain.ngo@d17.tn'
    }
  ];

  const handleDonation = () => {
    if (!selectedMethod || !amount) {
      alert('Please select a payment method and enter an amount');
      return;
    }

    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (method) {
      const message = `Donation Details:\nAmount: ${amount} TND\nMethod: ${method.name}\n\n${method.details}`;
      alert(message);

      // Here you would typically integrate with actual payment APIs
      // For now, we'll just show the details
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Heart className="w-6 h-6 text-red-500" />
            Make a Donation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600">
              Your generous contribution helps us provide essential services, training, and support to those seeking to rebuild their lives.
            </p>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Donation Amount (TND)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <Label>Choose Payment Method</Label>
            <div className="grid gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={method.id}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      selectedMethod === method.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'hover:border-orange-300'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedMethod === method.id ? 'bg-orange-500' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          selectedMethod === method.id ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                    {selectedMethod === method.id && (
                      <div className="mt-3 p-3 bg-orange-100 rounded-lg">
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                          {method.details}
                        </p>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDonation}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              disabled={!selectedMethod || !amount}
            >
              Complete Donation
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-gray-500">
            <p>All donations are tax-deductible. For questions, contact info@bornagain.org</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
